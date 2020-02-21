import * as React from 'react'
import Flag from '../Flag'
import { TableRowProps, AppState } from '../../types'
import { addCountryToCart } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { TableCell, TableRow as GrommentTableRow, Button, Text } from 'grommet'
import { AddCircle } from 'grommet-icons'
import { ThemeContext } from '../../themes'
import { useContext } from 'react'

const TableRow = ({ country }: TableRowProps) => {
  const inCartItems = useSelector(
    (state: AppState) => state.countries.inCartItems
  )

  const dispatch = useDispatch()

  const { theme } = useContext(ThemeContext)

  return (
    <GrommentTableRow>
      <TableCell>
        <Flag imageUrl={country.flag} name={country.name} />
      </TableCell>
      <TableCell align="center">
        <Link to={`/countries/${country.name}`}>
          <Text size="large">{country.name}</Text>
        </Link>
      </TableCell>
      <TableCell align="center">
        <Text size="large">{country.population}</Text>
      </TableCell>
      <TableCell align="center">
        {country.languages.map(language => (
          <ul key={language.name} style={{ listStyleType: 'none' }}>
            <li>
              <Text size="large">{language.name}</Text>
            </li>
          </ul>
        ))}
      </TableCell>
      <TableCell align="center">
        <Text size="large">{country.region}</Text>
      </TableCell>
      <TableCell align="center">
        <Button
          disabled={
            inCartItems.find(item => item.name === country.name) ? true : false
          }
          label="ADD"
          icon={<AddCircle />}
          color={theme.foreground}
          primary={true}
          onClick={() => dispatch(addCountryToCart(country))}
        />
      </TableCell>
    </GrommentTableRow>
  )
}

export default TableRow
