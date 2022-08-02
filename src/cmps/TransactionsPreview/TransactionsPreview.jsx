import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
// import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

export const TransactionsPreview = ({ transactions }) => {
  const transactionPreviewStyle = {
    bgcolor: "#CEF6FF",
    borderRadius: 2,
    border: 1,
  };

  const navigate = useNavigate();

  const onGoTransactionsPage = () => {
    navigate("/transactions");
  };
  return (
    <div className="transactions-preview">
      <Timeline sx={transactionPreviewStyle}>
        <AspectRatioIcon
          sx={{ alignSelf: "flex-end" }}
          onClick={onGoTransactionsPage}
        />
        <h2>Recent transactions</h2>
        {transactions.map((transaction) => (
          <TimelineItem key={transaction._id}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              className="date"
              color="text.secondary"
            >
              <p>
                {new Date(transaction.createdAt).toLocaleDateString("en-Gb", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <span>
                {new Date(transaction.createdAt).toLocaleTimeString("en-Gb")}
              </span>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {/* {transaction.fromImg && <Avatar src={transaction.fromImg} />}
              {transaction.toImg && <Avatar src={transaction.toImg} />} */}
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ m: 'auto 0' }}>
              <div className="transaction-preview">
                <h4>
                  Transfer {transaction.from ? "from" : "to"}{" "}
                  <span>
                    {transaction.from ? transaction.from : transaction.to}
                  </span>
                </h4>
                <p>
                  <span
                    className={`amount ${
                      transaction.from ? "amount-plus" : "amount-minus"
                    }`}
                  >
                    {transaction.from ? "+" : "-"}
                    {transaction.transferAmount}
                  </span>{" "}
                  ₿
                </p>
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
