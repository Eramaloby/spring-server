export interface UserDtoData {
  username: string;
  id: number;
}

export class UserDto {
  username: string;
  id: number;

  constructor(user: UserDtoData) {
    this.username = user.username;
    this.id = user.id;
  }
}
