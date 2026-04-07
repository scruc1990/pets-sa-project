import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MascotasService } from './mascotas.service';
import { Mascota } from './entities/mascota.entity';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';

@Resolver(() => Mascota)
export class MascotasResolver {
  constructor(private readonly mascotasService: MascotasService) {}

  @Mutation(() => Mascota)
  createMascota(@Args('input') input: CreateMascotaDto) {
    return this.mascotasService.create(input);
  }

  @Query(() => [Mascota], { name: 'mascotas' })
  findAllMascotas() {
    return this.mascotasService.findAll();
  }

  @Query(() => Mascota, { name: 'mascota' })
  findMascota(@Args('id') id: string) {
    return this.mascotasService.findOne(id);
  }

  @Mutation(() => Mascota)
  updateMascota(
    @Args('id') id: string,
    @Args('input') input: UpdateMascotaDto,
  ) {
    return this.mascotasService.update(id, input);
  }

  @Mutation(() => Mascota)
  deleteMascota(@Args('id') id: string) {
    return this.mascotasService.remove(id);
  }
}