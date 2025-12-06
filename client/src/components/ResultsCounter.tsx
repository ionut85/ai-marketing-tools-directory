interface ResultsCounterProps {
  showing: number;
  total: number;
}

export function ResultsCounter({ showing, total }: ResultsCounterProps) {
  return (
    <p className="text-sm text-muted-foreground" data-testid="text-results-count">
      Showing {showing} of {total} tools
    </p>
  );
}
