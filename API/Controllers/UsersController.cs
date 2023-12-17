using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly ILogger<UsersController> _logger;
    private readonly DataContext _context;

    public UsersController(DataContext context, ILogger<UsersController> logger)
    {
        _logger = logger;
        _context = context;
    }

    [AllowAnonymous]
    [HttpGet]   // api/users
    public async Task<ActionResult<IEnumerable<string>>> GetUsers()
    {
        var users = await _context.Users.Select(user => user.UserName).ToListAsync();
        return users;
    }
    [HttpGet("{id}")] // api/user/2
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await _context.Users.Where(user => user.Id == id).ToArrayAsync();
        if (user.Count() == 0)
        {
            return NotFound(user);
        }
        return Ok(user[0]);
    }

    [HttpDelete("delete/{id}")] // api/user/2
    public async Task<ActionResult<AppUser>> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(user);
        }
        _context.Users.Remove(user);
        return Ok(user);
    }


}