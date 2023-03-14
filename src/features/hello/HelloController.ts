// eslint-disable-next-line import/no-extraneous-dependencies
import { Body, Controller, Post, Route, Response } from 'tsoa';
import { CreateHelloDto } from './dtos/CreateHelloDto';
import { CreatedHelloDto } from './dtos/CreatedHelloDto';

@Route('/hello')
export class HelloController extends Controller {
  @Post()
  @Response(201, 'Success')
  public create(@Body() hello: CreateHelloDto) {
    if (hello.nickname === 'test') throw new Error('Error');
    return new CreatedHelloDto(`Hello ${hello.nickname}`);
  }
}
