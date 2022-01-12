import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ICompany, Company } from '../company.model';

import { CompanyService } from './company.service';

describe('Company Service', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;
  let elemDefault: ICompany;
  let expectedResult: ICompany | ICompany[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      created: currentDate,
      nip: 'AAAAAAA',
      regon: 'AAAAAAA',
      street: 'AAAAAAA',
      city: 'AAAAAAA',
      postCode: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          created: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Company', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          created: currentDate.format(DATE_TIME_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          created: currentDate,
        },
        returnedFromService
      );

      service.create(new Company()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Company', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          nip: 'BBBBBB',
          regon: 'BBBBBB',
          street: 'BBBBBB',
          city: 'BBBBBB',
          postCode: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          created: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Company', () => {
      const patchObject = Object.assign(
        {
          nip: 'BBBBBB',
          city: 'BBBBBB',
        },
        new Company()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          created: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Company', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          created: currentDate.format(DATE_TIME_FORMAT),
          nip: 'BBBBBB',
          regon: 'BBBBBB',
          street: 'BBBBBB',
          city: 'BBBBBB',
          postCode: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          created: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Company', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCompanyToCollectionIfMissing', () => {
      it('should add a Company to an empty array', () => {
        const company: ICompany = { id: 123 };
        expectedResult = service.addCompanyToCollectionIfMissing([], company);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(company);
      });

      it('should not add a Company to an array that contains it', () => {
        const company: ICompany = { id: 123 };
        const companyCollection: ICompany[] = [
          {
            ...company,
          },
          { id: 456 },
        ];
        expectedResult = service.addCompanyToCollectionIfMissing(companyCollection, company);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Company to an array that doesn't contain it", () => {
        const company: ICompany = { id: 123 };
        const companyCollection: ICompany[] = [{ id: 456 }];
        expectedResult = service.addCompanyToCollectionIfMissing(companyCollection, company);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(company);
      });

      it('should add only unique Company to an array', () => {
        const companyArray: ICompany[] = [{ id: 123 }, { id: 456 }, { id: 38564 }];
        const companyCollection: ICompany[] = [{ id: 123 }];
        expectedResult = service.addCompanyToCollectionIfMissing(companyCollection, ...companyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const company: ICompany = { id: 123 };
        const company2: ICompany = { id: 456 };
        expectedResult = service.addCompanyToCollectionIfMissing([], company, company2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(company);
        expect(expectedResult).toContain(company2);
      });

      it('should accept null and undefined values', () => {
        const company: ICompany = { id: 123 };
        expectedResult = service.addCompanyToCollectionIfMissing([], null, company, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(company);
      });

      it('should return initial array if no Company is added', () => {
        const companyCollection: ICompany[] = [{ id: 123 }];
        expectedResult = service.addCompanyToCollectionIfMissing(companyCollection, undefined, null);
        expect(expectedResult).toEqual(companyCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
