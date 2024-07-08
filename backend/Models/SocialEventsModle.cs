namespace Models{
    public class SocialEvents{
        public long ID { get; set; }
        public String Poster { get; set; }
        public String Date { get; set; }
        public String Time { get; set; }
        public String Location { get; set; }
        public String? Description { get; set; }
        public IFormFile Image { get; set; }
    }
}