using API.Controllers;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private ILogger<UsersController> _logger;
        private DataContext _context;

        public UserRepository(DataContext context, ILogger<UsersController> logger)
        {
            _logger = logger;
            _context = context;
        }
        public async Task<AppUser> GetByIdAsync(int id)
        {
            return await _context.Users
                                .Include(p => p.AppReports)
                                .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<AppUser> GetByUserNameAsync(string userName)
        {
            return await _context.Users
                            .Include(p => p.AppReports)
                            .FirstOrDefaultAsync(user => user.UserName == userName);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            var users = await _context.Users
                                    .Include(p => p.AppReports)
                                    .ToListAsync();
            return users;
        }

        public async Task<bool> SaveAllAsync()
        {
           return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
