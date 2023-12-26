using API.DTO;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]   // api/users
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await _userRepository.GetUsersAsync();
        var usersDto = users.Select(user => new MemberDto(user));
        return Ok(usersDto);
    }

    [HttpGet("{name}")] // api/users/verna
    public async Task<ActionResult<MemberDto>> GetUser(string name)
    {
        var user = await _userRepository.GetByUserNameAsync(name);
        var userDto = new MemberDto(user);
        return Ok(userDto);
    }
}