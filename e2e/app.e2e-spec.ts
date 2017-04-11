import { KoprintPage } from './app.po';

describe('koprint App', () => {
  let page: KoprintPage;

  beforeEach(() => {
    page = new KoprintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
