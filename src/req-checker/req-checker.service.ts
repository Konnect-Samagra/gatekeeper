import { ForbiddenException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { isSubset } from '../gql-utils';
import { lastValueFrom, map } from 'rxjs';
import { ConsentArtifact } from './interface/req-checker.interface';

@Injectable()
export class ReqCheckerService {
  constructor(private readonly httpService: HttpService) { }

  async reqChecker(consentArtifact: ConsentArtifact, gqlQuery: string) {
    if (!isSubset(consentArtifact.data, gqlQuery)) {
      throw new ForbiddenException('Forbidden.');
    } else {
      // call the resolver here
      const data = {
        gql: gqlQuery,
      };

      const requestOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
        redirect: 'follow',
      };
      try {
        const responseData = await lastValueFrom(
          this.httpService
            .post(process.env.RESOLVER_URI, data, requestOptions)
            .pipe(
              map((response) => {
                return response.data;
              }),
            ),
        );
        console.log(responseData.data);
        return responseData.data;
      } catch (err) {
        console.log('error: ', err);
      }
    }
  }
}
