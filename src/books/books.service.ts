import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { SearchBooksDTO } from './dto/search-books.dto';

@Injectable()
export class BooksService {
  constructor(private readonly http: HttpService) {}

  headersRequest = {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  };

  async getSearchBook(searchBooksDTO: SearchBooksDTO): Promise<Observable<AxiosResponse>> {
    const { query, start = 1 } = searchBooksDTO;

    const result = await this.http
      .get(`${process.env.NAVER_SEARCH_API_SERVER}/book.json?query=${query}&start=${start}`, {
        headers: this.headersRequest,
      })
      .pipe(map(response => response.data));

    return result;
  }
}
