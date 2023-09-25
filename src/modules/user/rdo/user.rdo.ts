import { Expose } from 'class-transformer';

export default class UserRdo {
  @Expose()
  public email!: string;
}
