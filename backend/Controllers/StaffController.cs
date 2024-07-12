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
            var staffList = await _staffRepository.GetAllStaffAsync();

            foreach (var staff in staffList){
                var filePath = Path.Combine("Uploads/Staff", $"{staff.ID}.jpg");
                if (System.IO.File.Exists(filePath)){
                    var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                    staff.ImageUrl = $"{baseUrl}/api/staff/image/{staff.ID}";
                }
            }

            return staffList;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaffById(long id){
            var staff = await _staffRepository.GetStaffByIdAsync(id);
            if (staff == null){
                return NotFound();
            }

            var filePath = Path.Combine("Uploads/Staff", $"{id}.jpg");
            if (System.IO.File.Exists(filePath)){
                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                staff.ImageUrl = $"{baseUrl}/api/staff/image/{id}";
            }

            return staff;
        }

        [HttpGet("image/{id}")]
        public async Task<IActionResult> GetImage(long id){
            var filePath = Path.Combine("Uploads/Staff", $"{id}.jpg");
            if (!System.IO.File.Exists(filePath)){
                return NotFound();
            }

            var image = System.IO.File.OpenRead(filePath);
            return File(image, "image/jpeg");
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> AddStaff([FromForm] Staff staff){
            await _staffRepository.AddStaffAsync(staff);

            if (staff.Image != null && staff.Image.Length > 0){
                var filePath = Path.Combine("Uploads/Staff", $"{staff.ID}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create)){
                    await staff.Image.CopyToAsync(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                staff.ImageUrl = $"{baseUrl}/api/staff/image/{staff.ID}"; // Set the image URL internally
            }

            return CreatedAtAction(nameof(GetStaffById), new { id = staff.ID }, staff);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStaff(long id, [FromForm] Staff staff){
            if (id != staff.ID){
                return BadRequest();
            }

            await _staffRepository.UpdateStaffAsync(staff);

            if (staff.Image != null && staff.Image.Length > 0){
                var filePath = Path.Combine("Uploads/Staff", $"{id}.jpg");

                using (var stream = new FileStream(filePath, FileMode.Create)){
                    await staff.Image.CopyToAsync(stream);
                }

                var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
                staff.ImageUrl = $"{baseUrl}/api/staff/image/{id}"; // Set the image URL internally
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(long id){
            var staff = await _staffRepository.GetStaffByIdAsync(id);
            if (staff == null){
                return NotFound();
            }

            // Delete the associated image file if it exists
            var filePath = Path.Combine("Uploads/Staff", $"{id}.jpg");
            if (System.IO.File.Exists(filePath)){
                System.IO.File.Delete(filePath);
            }

            await _staffRepository.DeleteStaffAsync(id);
            return NoContent();
        }
    }
}
