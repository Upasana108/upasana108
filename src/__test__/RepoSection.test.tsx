import Enzyme from "../Test-Setup";
import RepoSection from "../RepoSection";

describe("Repo Component Testing", () => {
  it("Test 1", () => {
    const element: any = Enzyme.shallow(<RepoSection />);
    expect(element.props().className).toMatch("repo-section");
  });
  it("Test 2", () => {
    const element: any = Enzyme.shallow(<RepoSection />);
    expect(element.find(".submit-section").props().children.type).toMatch(
      "input"
    );
  });
  it("Test 3", () => {
    const element: any = Enzyme.shallow(<RepoSection />);
    expect(element.find(".user-input").props().placeholder).toMatch(
      "GitHub Username"
    );
  });
});
