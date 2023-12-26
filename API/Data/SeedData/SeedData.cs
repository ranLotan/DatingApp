using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data.SeedData
{
    public class SeedData
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) { return ; }

            var userData = await File.ReadAllTextAsync("Data/SeedData/UserSeedData.json");

            var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true };

            var usersData = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            foreach ( var user in usersData ) 
            {
                using var hmac = new HMACSHA512();
                
                user.UserName = user.UserName.ToLower();
                user.HashedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.HashedSalt = hmac.Key;

                context.Users.Add(user);
            }
            
            await context.SaveChangesAsync();
        }
    }
}
