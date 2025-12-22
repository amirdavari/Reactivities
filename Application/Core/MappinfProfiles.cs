using AutoMapper;
using Domain;

namespace Application.Core;

public class MappinfProfiles : Profile
{
    public MappinfProfiles()
    {
        CreateMap<Activity, Activity>();
    }
}
