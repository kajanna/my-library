import "./Card.scss";

interface cardProps {
  children: JSX.Element[] | JSX.Element | string;
  title?: JSX.Element[] | JSX.Element | string | null;
  cardFooter?: JSX.Element[] | JSX.Element | string | null;
  addContentPadding?: boolean | null;
  noTitlePadding?: boolean | null;
}

const Card = ({
  children,
  title,
  cardFooter,
  addContentPadding,
  noTitlePadding,
}: cardProps) => {
  return (
    <div className="card">
      <div
        className={
          noTitlePadding ? "card_title card_title--padding" : "card_title"
        }
      >
        {title}
      </div>
      <div
        className={
          addContentPadding
            ? "card_content card_content--padding"
            : "card_content"
        }
      >
        {children}
      </div>
      <div className={cardFooter ? "card_footer" : "card_footer--no-content"}>
        {cardFooter && cardFooter}
      </div>
    </div>
  );
}

export default Card;
