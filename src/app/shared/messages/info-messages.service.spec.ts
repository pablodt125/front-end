import { TestBed } from '@angular/core/testing';

import { InfoMessagesService } from './info-messages.service';

describe('InfoMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoMessagesService = TestBed.get(InfoMessagesService);
    expect(service).toBeTruthy();
  });
});
