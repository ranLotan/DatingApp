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
        private DataContext _context;
        private ITokenService _tokenService;

        public ReportsController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpGet]   // api/users
        public async Task<ActionResult<IEnumerable<string>>> GetReports()
        {
            var reports = await _context.Reports.Select(report => report.Title).ToListAsync();
            return reports;
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
