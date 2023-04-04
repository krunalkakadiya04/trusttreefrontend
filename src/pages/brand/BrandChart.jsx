import { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBranchGraphByBranchID } from "../../middlewares/branches";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart } from "react-chartjs-2";
import { dateFormat } from "../../helpers/dateFormat";
import { useTranslation } from "react-i18next";

const BrandChart = ({ show, hide, branch_id, branch_name }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch();
  const { graph } = useSelector((state) => state.branch);
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ChartDataLabels
  );

  const options = {
    scales: {
      y: {
        grid: {
          color: "rgba(169, 208, 246, 0.75)",
          lineWidth: 1,
        },
        grace: 1,
        max: 5,
        position: "left",
      },
      y1: {
        grid: {
          tickBorderDashOffset: 100,
          display: false,
        },
        grace: 100,
        max: 500,
        position: "right",
      },
      x: {
        grid: {
          display: false,
          lineDashed: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    let dt = new Date();

    let endDt = dateFormat(dt);
    let startDt = dateFormat(dt.setDate(dt.getDate() - 365));
    const payload = {
      date: { start: startDt, end: endDt },
      sort: { order: 1 },
    };
    dispatch(getBranchGraphByBranchID(branch_id, payload));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branch_id]);

  const data = {
    labels: graph
      ? graph.map((o) => {
        return o.both;
      })
      : [],
    datasets: [
      {
        yAxisID: "y1",
        type: "line",
        opposite: true,
        borderColor: "black",
        borderWidth: 0.5,
        lineTension: 0.5,
        label: "Total count",
        pointStyle: "circle",
        datalabels: {
          color: "#292D32",
          anchor: "end",
          align: "top",
          font: {
            weight: "bold",
          },
        },
        data: graph
          ? graph.map((o) => {
            return o.totalCount;
          })
          : [],
      },
      {
        yAxisID: "y",
        type: "bar",
        barThickness: 24,
        datalabels: {
          color: "#292D32",
          anchor: "end",
          align: "top",
          font: {
            weight: "bold",
          },
        },
        backgroundColor: graph
          ? graph.map((o) => {
            return o.rating_avg > 4.99
              ? "#9FFF87"
              : o.rating_avg > 3.99
                ? "#bfddf0"
                : o.rating_avg > 1.99
                  ? "#E6E22E"
                  : "#E64747";
          })
          : "#bfddf0",
        borderRadius: 100,
        label: "Average ratings",
        data: graph
          ? graph.map((o) => {
            return parseFloat(o.rating_avg).toFixed(2);
          })
          : [],
      },
    ],
  };

  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={hide}
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title className="h5 ">
            {branch_name !== null
              ? `${t("PERFORMANCE_OVER_TIME")} - ${branch_name}`
              : `${t("PERFORMANCE_OVER_TIME")}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Chart type="bar" data={data} options={options} height={100} />
            <div className="Experience-btn-modal flex justify-content-center">
              <Button
                className="send-modal"
                onClick={hide}
              >
                {t("CLOSE")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BrandChart;
