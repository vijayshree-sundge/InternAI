using Xunit;
using InternAI.Api.Services;
using InternAI.Api.Models;
using Microsoft.Extensions.Configuration;

public class AuthTests {
    [Fact]
    public void GenerateToken_ProducesNonEmptyToken() {
        var user = new User { Id = 1, Name = "Test", Email = "t@t.com", Role = "Manager" };
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?> {
                { "Jwt:Key", "a-much-longer-development-secret-key-for-jwt-signing-32bytes-plus" }
            })
            .Build();

        var token = JwtHelper.GenerateToken(user, config);

        Assert.False(string.IsNullOrEmpty(token));
        Assert.Contains(".", token);
    }
}
