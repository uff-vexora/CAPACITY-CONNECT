import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
export function Users() {
  const people = [
    [
      "Rahul Sharma",
      "Regional Operations",
      "Operations Associate",
      "72%",
      "In progress",
    ],
    ["Priya Menon", "Customer Success", "Team Lead", "78%", "On track"],
    ["Arun Patel", "Manufacturing", "Engineer", "66%", "Needs training"],
    ["Neha Singh", "Finance", "Analyst", "82%", "On track"],
  ];
  return (
    <>
      <PageHead kicker="PEOPLE DIRECTORY" title="Employees">
        <button className="button outline">
          <Icon name="Download" size={16} /> Export
        </button>
      </PageHead>
      <div className="table-tools">
        <div>
          <Icon name="Search" size={17} />
          <input placeholder="Search employees" />
        </div>
        <button className="button outline">
          <Icon name="SlidersHorizontal" size={16} /> Filter
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              {[
                "Name",
                "Department",
                "Role",
                "Competency",
                "Training status",
                "Action",
              ].map((x) => (
                <th key={x}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr key={p[0]}>
                <td>
                  <b>{p[0]}</b>
                </td>
                <td>{p[1]}</td>
                <td>{p[2]}</td>
                <td>
                  <strong>{p[3]}</strong>
                </td>
                <td>
                  <span
                    className={
                      "status " + (p[4] === "Needs training" ? "warn" : "")
                    }
                  >
                    {p[4]}
                  </span>
                </td>
                <td>
                  <button className="text-button">View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
