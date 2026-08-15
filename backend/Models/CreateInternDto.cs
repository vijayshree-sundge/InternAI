namespace InternAI.Api.Models;

public class CreateInternDto {
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public int? BatchId { get; set; }
}