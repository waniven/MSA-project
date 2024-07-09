using System.Reflection.Metadata;

namespace Models{
    public class Staff{
        public long ID { get; set; }
        public String Department { get; set; }
        public String Role { get; set; }
        public String? Office { get; set; }
        public String? about { get; set; }
        public String Email { get; set; }
        public String PhoneExtention { get; set; }
        public String PhoneNumber { get; set; }
    }
}