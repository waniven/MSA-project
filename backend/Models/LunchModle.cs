using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    public class Lunch{
        public long ID { get; set; }
        public String Poster { get; set; }
        public String Category { get; set; }
        public String Time { get; set; }
        public String? Description { get; set; }
        
        [NotMapped]
        public IFormFile Image { get; set; }
        public string ImageFilePath { get; set; }
    }
}