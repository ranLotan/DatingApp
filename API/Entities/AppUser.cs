using API.Extentions;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Text;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] HashedPassword { get; set; } 
        public byte[] HashedSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string city { get; set; }
        public string country { get; set; }
        public ICollection<AppReport> AppReports { get; set; }

        public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }
    }
}
