import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
    const { repos } = React.useContext(GithubContext);

    const [mostUsed, setMostUsed] = React.useState([]);
    const [stars, setStars] = React.useState([]);
    const [mostPopular, setMostPopular] = React.useState([]);
    const [mostForked, setMostForked] = React.useState([]);

    const calculateChartData = React.useCallback(() => {
        const languages = repos.reduce((total, repo) => {
            const { language, stargazers_count } = repo;
            if (language) {
                if (!total[language]) {
                    total[language] = {
                        label: language,
                        value: 1,
                        stars: stargazers_count,
                    };
                } else {
                    total[language] = {
                        ...total[language],
                        value: total[language].value + 1,
                        stars: total[language].stars + stargazers_count,
                    };
                }
            }

            return total;
        }, {});
        const mostUsedLanguages = Object.values(languages)
            .sort((a, b) => {
                return b.value - a.value;
            })
            .slice(0, 5);

        const starsPerLanguages = Object.values(languages)
            .sort((a, b) => {
                return b.stars - a.stars;
            })
            .map(item => {
                return { ...item, value: item.stars };
            })
            .slice(0, 5);

        // Not good practice because it overwrites "stargazers_count" values in total.stars
        let { stars, forks } = repos.reduce(
            (total, item) => {
                const { stargazers_count, name, forks } = item;
                total.stars[stargazers_count] = {
                    label: name,
                    value: stargazers_count,
                };
                total.forks[forks] = { label: name, value: forks };
                return total;
            },
            {
                stars: {},
                forks: {},
            }
        );

        stars = Object.values(stars).slice(-5).reverse();
        forks = Object.values(forks).slice(-5).reverse();

        setMostUsed(mostUsedLanguages);
        setStars(starsPerLanguages);
        setMostPopular(stars);
        setMostForked(forks);
    }, [repos]);

    React.useEffect(() => {
        calculateChartData();
    }, [calculateChartData]);

    return (
        <section className="section">
            <Wrapper className="section-center">
                <Pie3D data={mostUsed} />
                <Column3D data={mostPopular} />
                <Doughnut2D data={stars} />
                <Bar3D data={mostForked} />
            </Wrapper>
        </section>
    );
};

const Wrapper = styled.div`
    display: grid;
    justify-items: center;
    gap: 2rem;
    @media (min-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
        grid-template-columns: 2fr 3fr;
    }

    div {
        width: 100% !important;
    }
    .fusioncharts-container {
        width: 100% !important;
    }
    svg {
        width: 100% !important;
        border-radius: var(--radius) !important;
    }
`;

export default Repos;
