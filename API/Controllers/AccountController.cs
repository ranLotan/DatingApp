﻿using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private DataContext _context;
        private ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService) 
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")] // POST: api/account/register
        public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
        {
            if (await IsUserExists(registerDto.UserName))
            {
                return BadRequest("UserName is ocuupied");
            }
            using var hmac = new HMACSHA512();
            AppUser user = new AppUser()
            {
                UserName = registerDto.UserName.ToLower(),
                HashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                HashedSalt = hmac.Key
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username");
            }

            using var hmac = new HMACSHA512(user.HashedSalt);
            var userName = loginDto.UserName;
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.HashedPassword[i])
                {
                    return Unauthorized("Invalid password");
                }
            }

            return new UserDto()
            {
                UserName = userName,
                Token = _tokenService.GetToken(user)
            };
        }   

        private async Task<bool> IsUserExists(string username)
        {
            return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
        }
    }

     
}
