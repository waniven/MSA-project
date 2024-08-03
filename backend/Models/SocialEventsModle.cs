using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    public class SocialEvents{
        public long ?ID { get; set; }
        public String Poster { get; set; }
        public String Name { get; set; }
        public String Date { get; set; }
        public String Time { get; set; }
        public String Location { get; set; }
        public String? Description { get; set; }
        [NotMapped]
        public IFormFile ?Image { get; set; }  

        [NotMapped]
        public string ?ImageUrl { get; set; }
    }
}