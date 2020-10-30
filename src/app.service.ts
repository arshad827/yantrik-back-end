import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { KeywordDto } from './dto/keyword.dto';
import { RovrSearch } from './models/search.model';

@Injectable()
export class AppService {

  constructor(
    private httpService: HttpService,
    @InjectRepository(RovrSearch) private rovrSearch?: Repository<RovrSearch>) { }

  /**
   * inserting new keyword
   * @param data 
   */
  async addKeyword(data: KeywordDto): Promise<any> {
    return await this.rovrSearch.save(data);
  }

  async getKeyword(pagination: { pageSize: number, pageIndex: number }): Promise<any> {
    // for time period I havent added distinct
    const keywords = await this.rovrSearch.find();

    // eslint-disable-next-line prefer-const
    let response = [];

    keywords.forEach(async (ele) => {
      response.push(this.getGitRepoDetails(ele, pagination));
    })

    return Promise.all(response).then(res => {
      console.log('res', res);
      return res;
    }).catch((error) => {
      console.error(error.message);
      return error;
    });
  }

/**
 * To query Github and get the list
 * @param data 
 * @param pagination 
 */
  getGitRepoDetails(
    data: { key: string, type: string },
    pagination: { pageSize: number, pageIndex: number }): Promise<any> {
    return new Promise(async (resolve, reject) => {

      const params = {
        q: `${data.type}:${data.key ? data.key : ''}`,
        sort: 'stars',
        order: 'desc',
        per_page: pagination.pageSize,
        page: pagination.pageIndex
      };

      const newResponse = await this.httpService.get('https://api.github.com/search/repositories?', {
        params
      }).toPromise()

      if (newResponse.status == 200) {
        resolve({
          key: data.key,
          type: data.type,
          value: newResponse.data
        })
      } else {
        reject(newResponse)
      }
    })


  }
}
