import { DocumentType } from '@typegoose/typegoose';

import CreateUserDto from './dto/create-user.dto.js';
import { UserEntity } from './user.entity.js';
import { MongoId } from '../../types/mongo-id.type.js';
import LoginUserDto from './dto/login-user.dto.js';

export interface UserServiceInterface {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  checkUserStatus(userId: MongoId): Promise<DocumentType<UserEntity> | null>;
  exists(documentId: string): Promise<boolean>;
  verifyUser(dto: LoginUserDto, salt: string): Promise<DocumentType<UserEntity> | null>;
}
