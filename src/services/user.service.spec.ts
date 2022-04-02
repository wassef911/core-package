import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import Backend from '..';
import { Registration } from '../models/class/registration';
import { LoginResponse, User } from '../models/class/user';

import { UserService } from './user.service';


const mockUser: User = {
  id: 22,
  first_name: 'name',
  last_name: 'last_name',
  cin_number: '14020238',
  profile_picture: 'link',
  function: 'function',
  birth_date: new Date(),
  email: 'string',
  phone_number: 25222111,
  address: 'string',
  facebook_account: 'string',
  municipalities: [],
};
const mockRegistration: Registration = {
  first_name: 'string',
  last_name: 'string',
  phone_number: 'string',
  password: 'string',
  birth_date: '2022-01-19',
  municipality_id: 216,
  email: 'test@gmail.com',
  password_verification: 'string',
};
const mockLoginResponse: LoginResponse = {
  refresh: 'eyJ0eZTkwWN6YzeHE',
  access: 'eyJ0eXAiOnVzZpKD3Q',
  first_login: false,
  preferred_municipality_id: 216,
  is_active: true,
};

fdescribe('User Service', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with the provided credentials', () => {
    service.loginOnlyPhone(20889742, '123456').subscribe(
      (res: LoginResponse) => {
        expect(res).not.toBe(null);
        expect(JSON.stringify(res)).toEqual(JSON.stringify(mockLoginResponse));
      },
      (err) => {
        fail(err.message);
      },
    );
    const testRequest = httpMock.expectOne(Backend.url + '/login');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(mockLoginResponse);
  });
  it('should register a new user', () => {
    service.register(mockRegistration).subscribe(
      (res) => {
        expect(res).not.toBe(null);
        expect(JSON.stringify(res)).toEqual(JSON.stringify(mockRegistration));
      },
      (err) => {
        fail(err.message);
      },
    );
    const testRequest = httpMock.expectOne(Backend.url + '/register');
    expect(testRequest.request.method).toBe('POST');
    testRequest.flush(mockRegistration);
  });
  it('should get user profile', () => {
    service.getUser().subscribe(
      (user: User) => {
        expect(user).not.toBe(null);
        expect(JSON.stringify(user)).toEqual(JSON.stringify(mockUser));
      },
      (err) => {
        fail(err.message);
      },
    );

    const testRequest = httpMock.expectOne(Backend.url + '/profile');
    expect(testRequest.request.method).toBe('GET');
    testRequest.flush(mockUser);
  });
});
