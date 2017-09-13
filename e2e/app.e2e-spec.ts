import { TechscanPage } from './app.po';

describe('techscan App', function() {
  let page: TechscanPage;

  beforeEach(() => {
    page = new TechscanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
