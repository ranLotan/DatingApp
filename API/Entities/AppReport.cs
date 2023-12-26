using API.DTO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppReport
    {
        public int Id { get; set; }
        public string Title { get; set; }
     
        public string Description { get; set; }
        public float Lat { get; set; }
        public float Long { get; set; }
        public DateOnly ReportDate { get; set; }

        public int UserId { get; set; }
        public virtual AppUser User { get; set; }
    }
}
