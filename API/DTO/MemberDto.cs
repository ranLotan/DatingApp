using API.Entities;

namespace API.DTO
{
    public class MemberDto
    {

        public int Id { get; set; }
        public string UserName { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<ReportDto> Reports { get; set; }
        public MemberDto(AppUser user)
        {
            if (user == null) { return; }

            Id = user.Id;
            UserName = user.UserName;
            DateOfBirth = user.DateOfBirth;
            CreatedAt = user.CreatedAt;
            LastActive = user.LastActive;
            City = user.city; Country = user.country;
            Reports = user.AppReports.Select(report => new ReportDto(report)).ToArray();
        }
    }
}
