import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { backend } from "../../utils/backend";
import { RouteComponentProps } from "react-router";
import { IArticle } from "../../types/article.d";
import ReactQuill from "react-quill";

interface MatchParams {
	slug: string;
}

interface ArticleProps extends RouteComponentProps<MatchParams> {}
function Article(props: ArticleProps) {
	const [article, setArticle] = useState<null | IArticle>(null);

	const getArticle = async () => {
		try {
			const response = await backend({
				url: `/blog/article/${props.match.params.slug}`,
			});
			setArticle(response.data);
		} catch (error) {}
	};

	useEffect(() => {
		getArticle();
	}, []);
	return (
		<div>
			{article && (
				<div dangerouslySetInnerHTML={{ __html: article.content }} />
			)}
		</div>
	);
}

export default withRouter(Article);
