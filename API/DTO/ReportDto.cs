using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class ReportDto
    {
        public int Id;


        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        [Required]
        public float Lat { get; set; }
        [Required]
        public float Long { get; set; }
        public DateOnly ReportDate { get; set; }

        public ReportDto() { }
        public ReportDto(AppReport report)
        {
            Title = report.Title;
            Description = report.Description;
            Lat = report.Lat;
            Long = report.Long;
            ReportDate = report.ReportDate;
        }
    }
}
