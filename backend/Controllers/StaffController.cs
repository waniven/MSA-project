using Microsoft.AspNetCore.Mvc;
using Models;
using Repositories;

namespace backend.Controllers{
    [ApiController]
    [Route("api/[controller]")]
    public class StaffController : ControllerBase{
        private readonly IStaffRepository _staffRepository;

        public StaffController(IStaffRepository staffRepository){
            _staffRepository = staffRepository;
        }

        [HttpGet]
        public async Task<IEnumerable<Staff>> GetAllStaff(){
            return await _staffRepository.GetAllStaffAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaffById(long id){
            var staff = await _staffRepository.GetStaffByIdAsync(id);
            if (staff == null){
                return NotFound();
            }else{
                return staff;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> AddStaff(Staff staff){
            await _staffRepository.AddStaffAsync(staff);
            return CreatedAtAction(nameof(GetStaffById), new { id = staff.ID }, staff);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(long id, Staff staff){
            if (id != staff.ID){
                return BadRequest();
            }else{
                await _staffRepository.UpdateStaffAsync(staff);
                return NoContent();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(long id){
            var staff = await _staffRepository.GetStaffByIdAsync(id);
            if (staff == null){
                return NotFound();
            }else{
                await _staffRepository.DeleteStaffAsync(id);
                return NoContent();
            }
        }
    }
}
