import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

// LAB 3: Apply SOLID to Feature
// This component INTENTIONALLY violates SOLID principles for the refactoring exercise.
// Your task: Refactor this tightly-coupled code using SOLID principles.

// Hardcoded API URL (violates DIP - tight coupling to concrete implementation)
const API_URL = 'https://api.interswitch.com/transactions';

// Transaction type (should be in separate types file)
type Transaction = {
  id: string;
  type: 'credit' | 'debit' | 'transfer' | 'payment';
  amount: number;
  date: string;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
  sender?: string;
};

// GOD COMPONENT - Violates SRP: handles data fetching, filtering, sorting, exporting, AND UI
const TransactionHistory = () => {
  // State management all in one place
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [sortField, setSortField] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Data fetching logic embedded in component (violates SRP)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        // Simulated API call - in real app this would be fetch(API_URL)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - hardcoded (violates DIP - should use data source abstraction)
        const mockData: Transaction[] = [
          {
            id: '1',
            type: 'credit',
            amount: 50000,
            date: '2024-03-15',
            description: 'Salary',
            status: 'completed',
          },
          {
            id: '2',
            type: 'debit',
            amount: 15000,
            date: '2024-03-14',
            description: 'Electricity Bill',
            status: 'completed',
          },
          {
            id: '3',
            type: 'transfer',
            amount: 25000,
            date: '2024-03-13',
            description: 'To John',
            status: 'pending',
            recipient: 'John Doe',
          },
          {
            id: '4',
            type: 'payment',
            amount: 8500,
            date: '2024-03-12',
            description: 'Netflix Subscription',
            status: 'completed',
          },
          {
            id: '5',
            type: 'credit',
            amount: 120000,
            date: '2024-03-10',
            description: 'Freelance Payment',
            status: 'completed',
          },
          {
            id: '6',
            type: 'debit',
            amount: 3500,
            date: '2024-03-09',
            description: 'Transport',
            status: 'failed',
          },
          {
            id: '7',
            type: 'transfer',
            amount: 45000,
            date: '2024-03-08',
            description: 'From Mom',
            status: 'completed',
            sender: 'Mom',
          },
          {
            id: '8',
            type: 'payment',
            amount: 2000,
            date: '2024-03-07',
            description: 'Data Bundle',
            status: 'completed',
          },
        ];
        setTransactions(mockData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter logic embedded in component (violates SRP - should be separate)
  const getFilteredTransactions = () => {
    let result = [...transactions];

    // Type filter (violates OCP - adding new filter requires modifying this function)
    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }

    // Status filter
    if (filterStatus !== 'all') {
      result = result.filter(t => t.status === filterStatus);
    }

    // Amount range filter
    if (minAmount) {
      const min = parseFloat(minAmount);
      if (!isNaN(min)) {
        result = result.filter(t => t.amount >= min);
      }
    }
    if (maxAmount) {
      const max = parseFloat(maxAmount);
      if (!isNaN(max)) {
        result = result.filter(t => t.amount <= max);
      }
    }

    // Date range filter
    if (startDate) {
      result = result.filter(t => new Date(t.date) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter(t => new Date(t.date) <= new Date(endDate));
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.description.toLowerCase().includes(query) ||
          t.recipient?.toLowerCase().includes(query) ||
          t.sender?.toLowerCase().includes(query),
      );
    }

    return result;
  };

  // Sorting logic embedded in component (violates SRP)
  const getSortedTransactions = () => {
    const filtered = getFilteredTransactions();

    return filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'date') {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'amount') {
        comparison = a.amount - b.amount;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  // Export logic embedded in component (violates SRP and OCP)
  const exportToCSV = () => {
    const data = getSortedTransactions();
    // CSV generation logic (violates OCP - adding PDF requires modifying this component)
    const headers = 'ID,Type,Amount,Date,Description,Status\n';
    const rows = data
      .map(
        t =>
          `${t.id},${t.type},${t.amount},${t.date},${t.description},${t.status}`,
      )
      .join('\n');
    const csv = headers + rows;

    // In a real app, this would trigger a file download
    console.log('CSV Export:', csv);
    Alert.alert('Export', 'CSV exported successfully!');
  };

  const exportToPDF = () => {
    const data = getSortedTransactions();
    // PDF generation logic (duplicated pattern from CSV - code smell)
    const pdfContent = {
      title: 'Transaction History',
      date: new Date().toISOString(),
      transactions: data.map(t => ({
        id: t.id,
        type: t.type,
        amount: formatCurrency(t.amount),
        date: formatDate(t.date),
        description: t.description,
        status: t.status,
      })),
    };

    console.log('PDF Export:', pdfContent);
    Alert.alert('Export', 'PDF exported successfully!');
  };

  // Utility functions embedded (should be in utils)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    // Magic strings (code smell)
    if (status === 'completed') return '#22c55e';
    if (status === 'pending') return '#f59e0b';
    if (status === 'failed') return '#ef4444';
    return '#6b7280';
  };

  const getTypeIcon = (type: string) => {
    // Another switch-like pattern (violates OCP)
    if (type === 'credit') return '+';
    if (type === 'debit') return '-';
    if (type === 'transfer') return '↔';
    if (type === 'payment') return '→';
    return '•';
  };

  // Render loading state
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#ED1C24" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => setLoading(true)}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const sortedTransactions = getSortedTransactions();

  // MASSIVE RENDER FUNCTION (violates SRP - UI should be separate)
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <Text style={styles.subtitle}>
          {sortedTransactions.length} transactions
        </Text>
      </View>

      {/* Search Bar - Inline styles (anti-pattern) */}
      <View style={{ padding: 16, backgroundColor: '#f8f9fa' }}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: '#e5e7eb',
          }}
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Section - Violates OCP: Adding new filters requires modifying this JSX */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filters</Text>

        {/* Type Filter */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Type:</Text>
          <View style={styles.filterButtons}>
            {['all', 'credit', 'debit', 'transfer', 'payment'].map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterButton,
                  filterType === type && styles.filterButtonActive,
                ]}
                onPress={() => setFilterType(type)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterType === type && styles.filterButtonTextActive,
                  ]}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Status Filter */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Status:</Text>
          <View style={styles.filterButtons}>
            {['all', 'completed', 'pending', 'failed'].map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filterButton,
                  filterStatus === status && styles.filterButtonActive,
                ]}
                onPress={() => setFilterStatus(status)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterStatus === status && styles.filterButtonTextActive,
                  ]}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Amount Range - Inline anonymous functions (anti-pattern) */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Amount:</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              style={styles.amountInput}
              placeholder="Min"
              keyboardType="numeric"
              value={minAmount}
              onChangeText={text => setMinAmount(text)}
            />
            <Text style={{ alignSelf: 'center' }}>to</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Max"
              keyboardType="numeric"
              value={maxAmount}
              onChangeText={text => setMaxAmount(text)}
            />
          </View>
        </View>

        {/* Date Range */}
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Date:</Text>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TextInput
              style={styles.dateInput}
              placeholder="Start (YYYY-MM-DD)"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="End (YYYY-MM-DD)"
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>
      </View>

      {/* Sort Options */}
      <View style={styles.sortSection}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortField === 'date' && styles.sortButtonActive,
          ]}
          onPress={() => setSortField('date')}
        >
          <Text
            style={
              sortField === 'date'
                ? styles.sortButtonTextActive
                : styles.sortButtonText
            }
          >
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortField === 'amount' && styles.sortButtonActive,
          ]}
          onPress={() => setSortField('amount')}
        >
          <Text
            style={
              sortField === 'amount'
                ? styles.sortButtonTextActive
                : styles.sortButtonText
            }
          >
            Amount
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <Text style={styles.orderButtonText}>
            {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Export Buttons - Violates OCP: Adding new export format requires modifying JSX */}
      <View style={styles.exportSection}>
        <TouchableOpacity style={styles.exportButton} onPress={exportToCSV}>
          <Text style={styles.exportButtonText}>Export CSV</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.exportButton, { backgroundColor: '#dc2626' }]}
          onPress={exportToPDF}
        >
          <Text style={styles.exportButtonText}>Export PDF</Text>
        </TouchableOpacity>
      </View>

      {/* Transaction List */}
      <FlatList
        data={sortedTransactions}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No transactions found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
        renderItem={({ item }) => (
          // Inline render function with business logic (anti-pattern)
          <TouchableOpacity
            style={styles.transactionCard}
            onPress={() => {
              // Navigation logic in render (violates SRP)
              Alert.alert(
                'Transaction Details',
                `ID: ${item.id}\nType: ${item.type}\nAmount: ${formatCurrency(
                  item.amount,
                )}\nDate: ${formatDate(item.date)}\nDescription: ${
                  item.description
                }\nStatus: ${item.status}`,
              );
            }}
          >
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.typeIcon,
                  {
                    backgroundColor:
                      item.type === 'credit' ? '#dcfce7' : '#fee2e2',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.typeIconText,
                    { color: item.type === 'credit' ? '#16a34a' : '#dc2626' },
                  ]}
                >
                  {getTypeIcon(item.type)}
                </Text>
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDescription}>
                  {item.description}
                </Text>
                <Text style={styles.transactionDate}>
                  {formatDate(item.date)}
                </Text>
              </View>
            </View>
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.type === 'credit' ? '#16a34a' : '#1f2937' },
                ]}
              >
                {item.type === 'credit' ? '+' : '-'}
                {formatCurrency(item.amount)}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Styles at bottom (good) but massive single object (could be split by concern)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#ED1C24',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  filterSection: {
    padding: 16,
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
  },
  filterButtonActive: {
    backgroundColor: '#ED1C24',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#4b5563',
  },
  filterButtonTextActive: {
    color: 'white',
  },
  amountInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  dateInput: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
  },
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    gap: 8,
  },
  sortLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  sortButtonActive: {
    backgroundColor: '#1f2937',
  },
  sortButtonText: {
    fontSize: 12,
    color: '#4b5563',
  },
  sortButtonTextActive: {
    color: 'white',
  },
  orderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#dbeafe',
  },
  orderButtonText: {
    fontSize: 12,
    color: '#1d4ed8',
  },
  exportSection: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  exportButton: {
    flex: 1,
    backgroundColor: '#1f2937',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  exportButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  typeIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});

export default TransactionHistory;
