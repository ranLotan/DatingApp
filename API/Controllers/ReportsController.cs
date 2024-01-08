using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    //[Authorize]
    public class ReportsController : BaseApiController
    {
        private IUserRepository _userRepository;
        private DataContext _context;
        private ITokenService _tokenService;

        public ReportsController(IUserRepository userRepository, DataContext context, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _context = context;
            _tokenService = tokenService;
        }   

        [AllowAnonymous]
        [HttpGet("reports")]   // api/users
        public async Task<ActionResult<IEnumerable<string>>> GetReports()
        {
            var reports = await _context.Reports.Select(report => report.Title).ToListAsync();
            return Ok(reports);
        }


        [HttpGet("{name}")]   // api/reports
        public async Task<ActionResult<IEnumerable<ReportDto>>> GetReportByName(string name)
        {
            var user = await _userRepository.GetByUserNameAsync(name);
            if (user == null || !user.AppReports.Any())
            {
                return NotFound($"{name} user not found");
            }
            
            var userReports = user.AppReports.Select(report => new ReportDto(report)).ToList();

            return Ok(userReports);
        }

        [HttpPost("addreport/{name}")]   // api/reports
        public async Task<ActionResult<bool>> AddReportByName([FromBody] ReportDto report, string name)
        {
            try
            {
                // Retrieve the user by name
                var user = await _userRepository.GetByUserNameAsync(name);

                if (user == null)
                {
                    // Handle the case where the user with the specified name is not found
                    return NotFound($"User with name {name} not found.");
                }

                // Create a new AppReport instance based on the data from ReportDto
                var appReport = new AppReport(report, user.Id);
                // Add the new report to the user's collection
                user.AppReports.Add(appReport);

                // Save changes to the database
                await _userRepository.SaveAllAsync();

                // Optionally, you can return the created report or other relevant information
                return Ok(true);
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return StatusCode(500, "Internal server error");
            }

            //[HttpPost("addReport")]
            //public async Task<ActionResult<bool>> AddReport(ReportDto reportDto)
            //{

            //    //AppReport report = new AppReport(reportDto);

            //    //_context.Reports.Add(report);
            //    //await _context.SaveChangesAsync();

            //    return true;
            //}


        }
    }
}
