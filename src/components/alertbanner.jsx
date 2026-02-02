export default function AlertBanner({ understaffedHours }) {
    const isWarning = understaffedHours.length > 0;
  
    return (
      <div className={isWarning ? "alert warning" : "alert success"}>
        {isWarning ? (
          <>
            <strong>Capacity Alert:</strong> High demand exceeds typical staffing at{" "}
            {understaffedHours.join(", ")}. Consider adding staff during these hours.
          </>
        ) : (
          <>
            <strong>All Clear:</strong> Current staffing levels appear adequate for predicted demand.
          </>
        )}
      </div>
    );
  }