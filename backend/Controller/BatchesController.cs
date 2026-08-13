[Authorize(Roles = "Manager")]
[ApiController][Route("api/[controller]")]
public class BatchesController : ControllerBase { /* manager-only endpoints */ }
