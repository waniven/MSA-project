using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modles;
using System.IO;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ImageUploadController : ControllerBase{
    [HttpPost]
    [Route("upload")]
    public async Task<IActionResult> UploadImage([FromForm] ImageUploadModel model){
        if (model.Image == null || model.Image.Length == 0){
            return BadRequest("No file uploaded.");
        }

        var filePath = Path.Combine("Uploads", model.Image.FileName);

        using (var stream = new FileStream(filePath, FileMode.Create)){
            await model.Image.CopyToAsync(stream);
        }
        return Ok(new { filePath });
    }

    [HttpDelete]
    [Route("delete/{fileName}")]
    public IActionResult DeleteImage(string fileName){
        var filePath = Path.Combine("Uploads", fileName);

        if (!System.IO.File.Exists(filePath)){
            return NotFound("File not found.");
        }

        System.IO.File.Delete(filePath);

        return Ok(new { message = "File deleted successfully." });
    }
}
