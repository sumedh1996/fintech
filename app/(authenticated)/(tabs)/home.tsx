import Dropdown from '@/components/Dropdown';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useBalanceStore } from '@/store/balanceStore';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import RoundBtn from '@/components/RoundButton';
import WidgetList from '@/components/SortableList/WidgetList';

const Page = () => {
  const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();
  const headerHeight = useHeaderHeight();

  const onAddMoney = () => {
    const value = Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1)
    runTransaction({
      id: Math.random().toString(),
      amount: value,
      date: new Date(),
      title: value > 0 ? 'Added money' : 'Withdrawn money',
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.background }}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}>
      <View style={styles.account}>
        <View style={styles.row}>
          <Text style={styles.balance}>{balance()}</Text>
          <Text style={styles.currency}>€</Text>
        </View>
        <TouchableOpacity
          style={[
            defaultStyles.pillButtonSmall,
            { backgroundColor: Colors.lightGray, marginVertical: 20 },
          ]}>
          <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>Accounts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
        <RoundBtn icon={'refresh'} text={'Exchange'} onPress={clearTransactions} />
        <RoundBtn icon={'list'} text={'Details'} />
        <Dropdown />
      </View>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>
      <Text style={defaultStyles.sectionHeader}>Transactions</Text>
      <Text style={defaultStyles.sectionSubHeader}>See all</Text>
      </View>
      <View style={styles.transactions}>
        {transactions.length === 0 && (
          <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
        )}
        {transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0,5).map((transaction) => (
          <View
            key={transaction.id}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View style={styles.circle}>
              <Ionicons
                name={transaction.amount > 0 ? 'add' : 'remove'}
                size={24}
                color={Colors.dark}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '400' }}>{transaction.title}</Text>
              <Text style={{ color: Colors.gray, fontSize: 12 }}>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text>{transaction.amount}€</Text>
          </View>
        ))}
      </View>
      <Text style={[defaultStyles.sectionHeader, {marginBottom: 0}]}>Widgets</Text>
      <WidgetList />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  account: {
    margin: 80,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 20,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  transactions: {
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Page;
