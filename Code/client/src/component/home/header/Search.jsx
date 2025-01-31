import { useState, useEffect } from 'react';
import { InputBase, Box, styled, List, ListItem, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';
import { Link } from 'react-router-dom';

const SearchContainer = styled(Box)`
    background-color: #fff;
    width: 38%;
    border-radius: 3px;
    margin-left: 10px;
    display: flex;
    position: relative;
`;

const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width: 100%;
    font-size: unset;
`;

const SearchIconBase = styled(Box)`
    color: blue;
    padding: 5px;
`;

const ListWrapper = styled(List)`
    position: absolute;
    color: #000;
    background: #FFFFFF;
    margin-top: 36px;
`;

const CategoryDropdown = styled(Select)`
    margin-left: 10px;
    background-color: #fff;
    border-radius: 3px;
    height: 35px;
`;

const Search = () => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');
    const { products } = useSelector((state) => state.getProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts(category)); // Fetch products (filtered or all)
    }, [category, dispatch]);

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory); // Update the category
        setText(''); // Clear search text
    };

    return (
        <SearchContainer>
            <InputSearchBase
                placeholder="Search for products, brands, and more"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <CategoryDropdown
                value={category}
                onChange={handleCategoryChange}
                displayEmpty style={{margin: 'auto 0'}}
            >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="Phone">Phone</MenuItem>
                <MenuItem value="Laptop">Laptop</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
            </CategoryDropdown>
            <SearchIconBase>
                <SearchIcon />
            </SearchIconBase>

            {text && (
                <ListWrapper>
                    {products
                        .filter((product) =>
                            product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                        )
                        .map((product) => (
                            <ListItem key={product.id}>
                                <Link
                                    to={`/product/${product.id}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    onClick={() => setText('')}
                                >
                                    {product.title.longTitle}
                                </Link>
                            </ListItem>
                        ))}
                </ListWrapper>
            )}
        </SearchContainer>
    );
};

export default Search;
