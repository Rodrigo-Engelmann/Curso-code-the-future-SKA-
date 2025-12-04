import { Test, TestingModule } from '@nestjs/testing';
import { TaskPagesService } from './taskPages.service';

describe('TaskPagesService', () => {
  let service: TaskPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskPagesService],
    }).compile();

    service = module.get<TaskPagesService>(TaskPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
