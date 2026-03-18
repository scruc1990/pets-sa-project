import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class BaseService {
  protected constructor(private readonly entityName: string) {}

  protected ensureId(id: string | number): string | number {
    if (id === null || id === undefined || `${id}`.trim() === '') {
      throw new BadRequestException(`El identificador de ${this.entityName} es obligatorio`);
    }

    return id;
  }

  protected throwNotFound(id: string | number): never {
    throw new NotFoundException(`${this.entityName} con identificador ${id} no encontrado`);
  }
}