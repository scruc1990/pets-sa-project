import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Resolver(() => Cliente)
export class ClientesResolver {
  constructor(private readonly clientesService: ClientesService) {}

  @Mutation(() => Cliente)
  createCliente(@Args('input') input: CreateClienteDto) {
    return this.clientesService.create(input);
  }

  @Query(() => [Cliente], { name: 'clientes' })
  findAllClientes() {
    return this.clientesService.findAll();
  }

  @Query(() => Cliente, { name: 'cliente' })
  findCliente(@Args('cedula') cedula: string) {
    return this.clientesService.findOne(cedula);
  }

  @Mutation(() => Cliente)
  updateCliente(
    @Args('cedula') cedula: string,
    @Args('input') input: UpdateClienteDto,
  ) {
    return this.clientesService.update(cedula, input);
  }

  @Mutation(() => Cliente)
  deleteCliente(@Args('cedula') cedula: string) {
    return this.clientesService.remove(cedula);
  }
}