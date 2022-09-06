import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import styled from "styled-components";
Chart.register(ArcElement);

const OverviewWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const GraphWrapper = styled.div`
display: flex;
width: 50vw;
min-width: 350px; 
height: 70vh; 
padding: 2rem; 
box-shadow: 6px -1px 20px 0px rgba(0, 0, 0, 0.45);
border-radius: 20px;
background-color: white;

/* overflow: hidden; */
`;


const OverviewChart = ({ jobData, allJobStatus }: { jobData: number[], allJobStatus: string[] }) => {
  // const OverviewChart = ({ jobData, allJobStatus }) => {

  const [testJobData, setTestJobData] = useState<number[]>([]);

  useEffect(() => {
    setTestJobData(jobData);
  }, [jobData])

  return (
    <>
      <OverviewWrapper>
        <GraphWrapper>
          <Doughnut
            height={200}
            width={200}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: "Job Application Overview",
                  padding: {
                    top: 10,
                    bottom: 30,
                  },
                  font: {
                    size: 28,
                  },
                },
                legend: {
                  labels: {
                    font: {
                      size: 20,
                    },
                  },
                },
              },
            }}
            data={{
              labels: [
                ...allJobStatus
              ],
              datasets: [
                {
                  label: "Job application",
                  data: testJobData,
                  backgroundColor: ["#6f42c1", "#0dcaf0", "#e91e63", "#32ad00", "#ffc107", "#ffeb3b"],
                },
              ],
            }}
          />
        </GraphWrapper>
      </OverviewWrapper>
    </>
  );
};

export default OverviewChart;
