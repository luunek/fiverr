import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { SkillModule } from './skill/skill.module';
import { CategoryModule } from './category/category.module';
import { JobModule } from './job/job.module';
import { JobImageModule } from './job-image/job-image.module';
import { HireJobModule } from './hire_job/hire_job.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [UserModule, PrismaModule, SkillModule, SkillModule, CategoryModule, JobModule, JobImageModule, HireJobModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'user/signin', method: RequestMethod.POST },
        { path: 'user/signup', method: RequestMethod.POST },
        'user/(.sign*)'
      )
      .forRoutes('*');
  }
}
