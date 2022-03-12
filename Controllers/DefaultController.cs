using Microsoft.AspNetCore.Mvc;

namespace ACMEClients.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DefaultController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return string.Empty;
        }
    }
}