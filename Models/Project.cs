using System.Security.Cryptography.X509Certificates;

namespace PersonalPortfolio.Models
{
    public class Project
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? ImageUrl { get; set; }
        public string? ProjectUrl { get; set; }

    }
}
